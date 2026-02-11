type HomeViewProps = {
  email: string | null;
};

export default function HomeView({ email }: HomeViewProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Home</h1>
        {email ? (
          <p data-testid="user-email">{email}</p>
        ) : (
          <p data-testid="user-email">No user found</p>
        )}
      </main>
    </div>
  );
}
