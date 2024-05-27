import { formatDate } from "@/lib/utils";
import { BarChartIcon } from "lucide-react";

type Props = {
  url: string;
  slug: string;
  lastClicked: Date;
  clicks: number;
};

const CardLinks = ({ url, slug, lastClicked, clicks }: Props) => {
  return (
    <div className="border bg-background p-3 rounded w-full space-y-3">
      <div className="flex justify-between items-center">
        <h3>/{slug}</h3>
        <div>
          <div className="flex cursor-default items-center space-x-2 text-sm">
            <BarChartIcon size={14} />
            <span className="font-mono">{clicks} clicks</span>
          </div>
        </div>
      </div>
      <h2 className="text-foreground/60 truncate">{url}</h2>
      <p className="text-foreground/40 text-right">{formatDate(lastClicked)}</p>
    </div>
  );
};

export default CardLinks;
