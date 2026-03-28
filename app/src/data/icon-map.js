import {
  Target, Users, Lightbulb, AlertCircle, Eye,
  PenTool, HelpCircle, Sparkles, RefreshCw, Zap,
  ShieldCheck, Shield, Scale, EyeOff, Heart
} from "lucide-react";

const ICON_MAP = {
  Target, Users, Lightbulb, AlertCircle, Eye,
  PenTool, HelpCircle, Sparkles, RefreshCw, Zap,
  ShieldCheck, Shield, Scale, EyeOff, Heart
};

export function resolveIcon(name) {
  return ICON_MAP[name] || null;
}
