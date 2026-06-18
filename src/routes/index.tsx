import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qizlar bazmi — Taklifnoma" },
      { name: "description", content: "Qizlar bazmi taklifnomasi — 24 iyun 2026, soat 19:00." },
      { property: "og:title", content: "Qizlar bazmi — Taklifnoma" },
      { property: "og:description", content: "Qizlar bazmi taklifnomasi — 24 iyun 2026, soat 19:00." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/invitation.html");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FEFCF8",
        fontFamily: "Montserrat, sans-serif",
        color: "#a8884f",
      }}
    >
      <a href="/invitation.html" style={{ color: "#a8884f", textDecoration: "underline" }}>
        Taklifnomani ochish
      </a>
    </div>
  );
}
