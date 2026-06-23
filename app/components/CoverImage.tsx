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
  tint,
  tintOnHover = false,
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
  // A Radix accent name. When set, the image is recoloured into a duotone of
  // this accent via a solid backdrop + `hard-light` (no added bytes).
  tint?: string;
  // Hold the duotone for hover only: at rest the image shows its own colour at
  // half saturation, blending to the `tint` duotone on hover. The blend itself
  // is driven by the `.cover-hover-tint` CSS, so we skip the inline blend mode.
  tintOnHover?: boolean;
}) {
  const imgStyle: CSSProperties = {
    objectFit: "cover",
    ...(tint && !tintOnHover
      ? { mixBlendMode: "hard-light" }
      : tint
        ? {}
        : { backgroundColor: "var(--gray-3)" }),
  };

  // The `fill` <Image> needs a positioned parent; this wrapper also carries the
  // accent backdrop and a uniform 4px corner clip for every image (inset or not).
  const frameStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "4px",
    overflow: "hidden",
    ...(tint ? { backgroundColor: `var(--${tint}-9)` } : {}),
  };

  const frame = (
    <div style={frameStyle} className={tintOnHover ? "cover-hover-tint" : undefined}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={!!tint}
        style={imgStyle}
      />
    </div>
  );

  // `fill` lets the parent (e.g. a card column) dictate the height; otherwise
  // AspectRatio fixes the crop.
  const picture = fill ? frame : <AspectRatio ratio={ratio}>{frame}</AspectRatio>;

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
