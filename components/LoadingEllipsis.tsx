export default function LoadingEllipsis({ isLoading }: { isLoading: boolean }) {
  return <span className={isLoading ? `ellipsis-animation` : ""} />;
}
