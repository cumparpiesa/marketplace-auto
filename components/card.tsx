"use client";

import Link from "next/link";

export default function Card({ item, link = "/firme" }: any) {
  return (
    <div className="card">
      <img src={item.image || "/placeholder.jpg"} className="card-img" />

      {item.pro && <span className="badge">PRO</span>}

      <div className="card-body">
        <h3>{item.nume}</h3>

        <p className="muted">📍 {item.oras}</p>
        <p>{item.descriere}</p>

        <Link href={`${link}/${item.id}`}>
          <button className="btn">Vezi detalii</button>
        </Link>
      </div>
    </div>
  );
}