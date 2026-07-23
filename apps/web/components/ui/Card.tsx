import { forwardRef } from "react";

type CardProps = {
  title: string;
  children: React.ReactNode;
};

const Card = forwardRef<HTMLElement, CardProps>(
  function Card(
    {
      title,
      children,
    },
    ref
  ) {
    return (
      <section
        ref={ref}
        className="card"
      >
        <h3 className="card-title">
          {title}
        </h3>

        {children}
      </section>
    );
  }
);

export default Card;