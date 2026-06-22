import Image from "next/image";
import type { CSSProperties } from "react";
import { AspectRatio, Inset, Text } from "@radix-ui/themes";
import type { ImageRef } from "@/lib/stories";

// The one idiomatic image path for the whole site: next/image (optimization,
// lazy-load, responsive) inside Radix AspectRatio (consistent crop). Set
// `inset` to bleed the image to a Card's top edge (Radix's Card+Inset pattern);
// otherwise it renders as a <figure> that can show the credit caption.
export function CoverImage({
  image,
  sizes,
  ratio = 16 / 9,
  inset = false,
  showCredit = false,
  priority = false,
}: {
  image: ImageRef;
  sizes: string;
  ratio?: number;
  inset?: boolean;
  showCredit?: boolean;
  priority?: boolean;
}) {
  const imgStyle: CSSProperties = {
    objectFit: "cover",
    backgroundColor: "var(--gray-3)",
    ...(inset ? {} : { borderRadius: "var(--radius-3)" }),
  };

  const picture = (
    <AspectRatio ratio={ratio}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={imgStyle}
      />
    </AspectRatio>
  );

  if (inset) {
    return (
      <Inset side="top" clip="padding-box" pb="current">
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
