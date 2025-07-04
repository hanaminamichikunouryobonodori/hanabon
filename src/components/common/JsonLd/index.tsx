type Props = {
  data: object;
};

export const JsonLd = ({ data }: Props) => {
  return (
    <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
};
