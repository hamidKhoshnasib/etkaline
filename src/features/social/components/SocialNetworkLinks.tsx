import { AppImage } from "@/components/ui/image";
import type { SocialNetwork } from "@/features/social/api/get-social-networks";

interface SocialNetworkLinksProps {
  socialNetworks: SocialNetwork[];
  className?: string;
}

export function SocialNetworkLinks({ socialNetworks, className }: SocialNetworkLinksProps) {
  if (socialNetworks.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {socialNetworks.map((socialNetwork) => (
        <a
          key={socialNetwork.id}
          href={socialNetwork.link}
          target="_blank"
          rel="noreferrer"
          aria-label={socialNetwork.title}
          className="group hover:bg-secondary flex size-8 items-center justify-center rounded-md bg-gray-200 transition-all"
        >
          <AppImage
            src={socialNetwork.picUrl}
            alt=""
            width={20}
            height={20}
            unoptimized
            className="size-5 object-contain"
          />
        </a>
      ))}
    </div>
  );
}
