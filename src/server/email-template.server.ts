import { siteUrl } from "./env.server";

export const escapeHtml = (value: string | number | null | undefined) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function emailButton(label: string, path: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0"><tr><td bgcolor="#b08958" style="border-radius:3px"><a href="${escapeHtml(siteUrl() + path)}" style="display:inline-block;padding:14px 24px;color:#1b110a;font-family:Georgia,serif;font-size:16px;text-decoration:none;font-weight:bold">${escapeHtml(label)}</a></td></tr></table>`;
}

export function emailLayout(preview: string, content: string) {
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark light"><title>Classic Aura</title></head><body style="margin:0;padding:0;background:#1b110a;color:#f6f0e6"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preview)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#1b110a"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border:1px solid #4a3727"><tr><td align="center" style="padding:32px 24px;border-bottom:1px solid #4a3727"><p style="margin:0 0 12px;color:#b08958;font-size:24px">&#10045;</p><a href="${escapeHtml(siteUrl())}" style="font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;letter-spacing:2px;color:#f6f0e6;text-decoration:none">CLASSIC AURA</a><p style="margin:10px 0 0;font-family:Jost,'Trebuchet MS',sans-serif;font-size:10px;letter-spacing:4px;color:#b08958">— GARBA DRESSES —</p></td></tr><tr><td bgcolor="#241710" style="padding:32px 24px;font-family:Jost,'Trebuchet MS',sans-serif;font-size:15px;line-height:1.7;color:#f6f0e6">${content}</td></tr><tr><td style="padding:24px;text-align:center;font-family:Jost,'Trebuchet MS',sans-serif;color:#cdb99d;font-size:12px;line-height:1.8">Garba dresses on rent · Indore<br>Free delivery &amp; pickup across Indore<br><a href="${escapeHtml(siteUrl())}/contact" style="color:#b08958">Contact Classic Aura</a></td></tr></table></td></tr></table></body></html>`;
}
