import { Paperclip } from 'lucide-react';
import type { SubmissionItem } from '../data/cmsStorage';
export function SubmissionAttachments({ item }: { item: Pick<SubmissionItem, 'id' | 'attachments'> }) {
  if (!item.attachments?.length) return null;
  return <div className="my-3 flex flex-wrap gap-2">{item.attachments.map(file => <a key={file.id} href={`/api/admin/submissions/${encodeURIComponent(item.id)}/attachments/${encodeURIComponent(file.id)}`} className="inline-flex max-w-full items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-gray-300"><Paperclip className="h-3 w-3 shrink-0"/><span className="truncate">{file.name}</span><span className="shrink-0 text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</span></a>)}</div>;
}
