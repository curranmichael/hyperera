import Image from "next/image";
import type { ComponentProps, CSSProperties } from "react";
import { AspectRatio, Inset, Text } from "@radix-ui/themes";
import type { ImageRef } from "@/lib/stories";

// The one idiomatic image path for the whole site: next/image (optimization,
// lazy-load, responsive). By default the image keeps a fixed crop via Radix
// AspectRatio; pass `fill` instead to have it stretch to a sized parent (the
// side image of a horizontal card). Set `inset` to bleed it to a Card's edge —
// Radix's Card+Inset pattern — choosing which edge(s) with `side`; otherwise it
// renders as a <figure> that can show the credit caption.
export function CoverImage({
  image,
  sizes,
  ratio = 16 / 9,
  inset = false,
  fill = false,
  side = "top",
  className,
  showCredit = false,
  priority = false,
}: {
  image: ImageRef;
  sizes: string;
  ratio?: number;
  inset?: boolean;
  fill?: boolean;
  side?: ComponentProps<typeof Inset>["side"];
  className?: string;
  showCredit?: boolean;
  priority?: boolean;
}) {
  const imgStyle: CSSProperties = {
    objectFit: "cover",
    backgroundColor: "var(--gray-3)",
    ...(inset ? {} : { borderRadius: "var(--radius-3)" }),
  };

  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      style={imgStyle}
    />
  );

  // `fill` lets the parent (e.g. a card column) dictate the height; otherwise
  // AspectRatio fixes the crop.
  const picture = fill ? img : <AspectRatio ratio={ratio}>{img}</AspectRatio>;

  if (inset) {
    return (
      // Re-add the bottom padding only when the image bleeds to the top, so
      // stacked content keeps its gap; a side image fills the height instead.
      <Inset
        side={side}
        clip="padding-box"
        pb={side === "top" ? "current" : undefined}
        className={className}
      >
        {picture}
      </Inset>
    );
  }

  return (
    <figure>
      {picture}
      {showCredit && image.credit ? (
        <Text as="p" size="1" color="gray" mt="1">
          {image.credit}
        </Text>
      ) : null}
    </figure>
  );
}
