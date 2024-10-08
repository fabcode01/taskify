interface TitleProps {
    title: string | undefined
    className?: string
}

export function Title(props: TitleProps) {
  return (
    <div>
      <h2 className={`font-semibold text-azul-medio text-xl mb-8 ${props.className}`}>{props.title}</h2>
    </div>
  );
}
