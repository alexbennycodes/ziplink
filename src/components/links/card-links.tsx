import { formatDate } from "@/lib/utils";
import { BarChartIcon } from "lucide-react";

type Props = {
  url: string;
  slug: string;
  lastClicked: Date;
  clicks: number;
};

const CardLinks = ({ url, slug, createdAt, clicks }: Props) => {
  return (
    <div className="border bg-background px-5 py-3 rounded w-full space-y-4 hover:shadow-lg transition-all ease-in-out duration-300">
      <div className="flex justify-between items-center">
        <h3 className="font-mono font-bold text-lg">/{slug}</h3>
        <div>
          <div className="flex cursor-default items-center space-x-2 text-sm">
            <span className="">{clicks} clicks</span>
          </div>
        </div>
      </div>
      <h2 className="text-foreground/60 truncate font-mono">{url}</h2>
      <p className="text-foreground/40 text-right text-sm">
        {formatDate(createdAt)}
      </p>
    </div>
  );
};

export default CardLinks;
