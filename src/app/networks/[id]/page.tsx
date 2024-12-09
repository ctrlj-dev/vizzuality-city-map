interface DetailPageProps {
  params: {
    id: string;
  };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = params;
  return (
    <div>
      <h1>Detail page</h1>
      <p>{id}</p>
    </div>
  );
}
