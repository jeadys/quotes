type Props = {
  quote: string;
  author: string;
};

export const QuoteItem = ({ quote, author }: Props) => {
  return (
    <li className="">
      <h3 className="">{quote}</h3>
      <h4 className="">{author}</h4>
    </li>
  );
};
