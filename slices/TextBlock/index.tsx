import { PrismicRichText } from "@/node_modules/@prismicio/react/dist/react-server/PrismicRichText";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <div className="text-justify max-w-prose">
    <PrismicRichText field={slice.primary.text}></PrismicRichText>

    </div>
  );
};

export default TextBlock;
