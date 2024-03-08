import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { PrismicNextImage } from "@/node_modules/@prismicio/next/dist/PrismicNextImage";
import { PrismicRichText } from "@/node_modules/@prismicio/react/dist/react-server/PrismicRichText";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Avatar from "@/components/Avatar";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading as="h2" size="lg" className="col-start-1">
          {slice.primary.heading}
        </Heading>
        <div className="prose prose-lg prose-slate prose-invert col-start-1 text-justify">
          <PrismicRichText field={slice.primary.description}/>
        </div>
        <Button linkField={slice.primary.button_link} label={slice.primary.button_text}/>

        <Avatar image={slice.primary.avatar} className="row-start-1 max-w-sm md:col-start-2 md:row-end-3" />
      </div>
    </Bounded>
  );
};

export default Biography;
