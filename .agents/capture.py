import sys
import json
import os
from datetime import datetime

def main():
    input_data = sys.stdin.read()
    if not input_data:
        return
        
    try:
        context = json.loads(input_data)
        transcript_path = context.get('transcriptPath')
        if not transcript_path:
            return
            
        full_transcript_path = transcript_path.replace('transcript.jsonl', 'transcript_full.jsonl')
        if not os.path.exists(full_transcript_path):
            full_transcript_path = transcript_path
            
        if not os.path.exists(full_transcript_path):
            return
            
        workspace_path = context.get('workspacePaths', [''])[0]
        if not workspace_path:
            workspace_path = os.getcwd()
            
        agent_logs_dir = os.path.join(workspace_path, '.agent-logs')
        os.makedirs(agent_logs_dir, exist_ok=True)
        
        session_id = context.get('conversationId', 'unknown-session')
        
        exchanges = []
        current_prompt = None
        
        with open(full_transcript_path, 'r', encoding='utf-8') as f:
            for line in f:
                if not line.strip():
                    continue
                try:
                    step = json.loads(line)
                    if step.get('type') == 'USER_INPUT':
                        current_prompt = {
                            'timestamp': step.get('created_at', ''),
                            'content': step.get('content', '')
                        }
                    elif step.get('type') == 'PLANNER_RESPONSE':
                        if current_prompt:
                            exchanges.append({
                                'prompt': current_prompt,
                                'response': {
                                    'timestamp': step.get('created_at', ''),
                                    'content': step.get('content', '')
                                }
                            })
                            current_prompt = None
                except json.JSONDecodeError:
                    pass
                    
        if not exchanges:
            return
            
        first_time = exchanges[0]['prompt']['timestamp']
        last_time = exchanges[-1]['prompt']['timestamp']
        
        try:
            # Parse '2026-09-12T15:47:45+05:00' to extract date
            date_str = first_time.split('T')[0] if 'T' in first_time else datetime.now().strftime('%Y-%m-%d')
        except:
            date_str = datetime.now().strftime('%Y-%m-%d')
            
        out_filename = f"{date_str}_{datetime.now().strftime('%H-%M-%S')}_{session_id}.md"
        out_filepath = os.path.join(agent_logs_dir, out_filename)
        
        # We need to clean old files for this session so we don't spam
        for file in os.listdir(agent_logs_dir):
            if session_id in file and file.endswith('.md'):
                os.remove(os.path.join(agent_logs_dir, file))
        
        with open(out_filepath, 'w', encoding='utf-8') as f:
            f.write("---\n")
            f.write(f"session_id: {session_id}\n")
            f.write(f"date: {date_str}\n")
            f.write("author: user\n")
            f.write(f"model: {context.get('modelName', 'auto')}\n")
            f.write("tool: antigravity\n")
            f.write("project: 8xtask\n")
            f.write(f"total_exchanges: {len(exchanges)}\n")
            f.write(f"first_prompt_time: {first_time}\n")
            f.write(f"last_prompt_time: {last_time}\n")
            f.write("---\n\n")
            
            f.write(f"# Session Log - {date_str}\n\n")
            f.write(f"Session: `{session_id}` | Project: `8xtask` | Author: `user`\n\n")
            f.write("---\n\n")
            
            for idx, ex in enumerate(exchanges, 1):
                f.write(f"[LOG_ENTRY type=PROMPT num={idx} session={session_id}]\n")
                f.write(f"timestamp: {ex['prompt']['timestamp']}\n")
                f.write(f"model: {context.get('modelName', 'auto')}\n\n")
                f.write(f"{ex['prompt']['content']}\n\n\n")
                
                f.write(f"[LOG_ENTRY type=RESPONSE num={idx} session={session_id}]\n")
                f.write(f"timestamp: {ex['response']['timestamp']}\n")
                f.write(f"model: {context.get('modelName', 'auto')}\n\n")
                f.write(f"{ex['response']['content']}\n\n\n")
                
        # Must return empty JSON object to satisfy stdout contract
        print("{}")
        
    except Exception as e:
        print("{}")
        
if __name__ == '__main__':
    main()
