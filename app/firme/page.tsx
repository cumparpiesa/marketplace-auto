import LayoutGrid from "@/components/LayoutGrid";
import Filters from "@/components/Filters";
import Card from "../../components/Card";
const firme = [
  {
    title: "Piese Auto Iasi",
    city: "Iasi",
    image: "https://picsum.photos/300"
  },
  {
    title: "Auto Cluj",
    city: "Cluj",
    image: "https://picsum.photos/301"
  }
];

export default function Page() {
  return (
    <LayoutGrid sidebar={<Filters />}>

      <h1>Descoperă firme</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20
      }}>
        {firme.map((f, i) => (
          <Card key={i} item={f} />
        ))}
      </div>

    </LayoutGrid>
  );
}