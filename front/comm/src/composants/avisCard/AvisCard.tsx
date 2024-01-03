export default function AvisCard({ content, rating, date}) {
    const formattedDate = new Date(date).toLocaleString()
  return (
    <>
      <div className="mt-10 flex flex-col shadow-md p-10 rounded">
        <div className="flex items-center justify-between">
        <span><strong>Un utilisateur annonym</strong></span>
        <span className="bg-amber-400 w-14 text-center py-1 rounded-full text-white font-bold">{rating}</span>
        </div>
        
        <p>
          {content}
        </p>
        <span className="mt-2">{formattedDate}</span>
      </div>
    </>
  );
}
