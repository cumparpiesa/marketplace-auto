import Link from "next/link";

export default function Card({ item }: any) {
  return (
    <div style={{
      background: "white",
      borderRadius: 12,
      overflow: "hidden"
    }}>
      <img src={item.image} style={{ width: "100%", height: 160 }} />

      <div style={{ padding: 10 }}>
        <h3>{item.title}</h3>
        <p>{item.city}</p>

        <Link href="#">
          <button>Vezi detalii</button>
        </Link>
      </div>
    </div>
  );
}