export default function Logo({ small, icon }: { small?: boolean; icon?: boolean }) {
  return (
    <h1 className="inline">
      <strong className={small ? "h-4 w-auto text-lg" : "h-5 w-auto text-2xl"}>abg.com</strong>
    </h1>
  );
}
