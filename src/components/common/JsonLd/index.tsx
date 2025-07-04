type Props = {
  data: object;
};

export const JsonLd = ({ data }: Props) => {
  return (
    <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type='application/ld+json' />
  );
};
