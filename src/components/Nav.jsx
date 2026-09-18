/* Toda navegação é uma âncora de hash — o browser cuida de foco, teclado e
   abrir em nova aba de graça. O router é só quem escuta o hashchange. */
export default function Nav({ to, children, ...props }) {
  return (
    <a href={`#${to}`} {...props}>
      {children}
    </a>
  );
}
