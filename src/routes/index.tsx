import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qizlar Bazmi — Durdonaxon & Toxirbek" },
      {
        name: "description",
        content: "Qizlar bazmi taklifnomasi — 24 iyun 2026, soat 19:00.",
      },
      { property: "og:title", content: "Qizlar Bazmi — Durdonaxon & Toxirbek" },
      {
        property: "og:description",
        content: "Qizlar bazmi taklifnomasi — 24 iyun 2026, soat 19:00.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/invitation.html"
      title="Qizlar Bazmi taklifnoma"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}
