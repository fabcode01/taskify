interface TitleProps {
    title: string
    className?: string
}

export function Title(props: TitleProps) {
  return (
    <div>
      <h2 className={`font-semibold text-azul-medio text-xl ${props.className}`}>{props.title}</h2>
    </div>
  );
}
