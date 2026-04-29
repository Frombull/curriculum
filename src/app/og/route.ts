import React from "react";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function GET(request: Request) {
  const origin = siteUrl ?? new URL(request.url).origin;
  const avatarUrl = new URL("/profile_picture.jpg", origin);
  const avatarData = await fetch(avatarUrl).then((res) => res.arrayBuffer());

  const root = React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0a0a0a",
        color: "#e8e8e8",
        padding: "80px 88px",
        fontFamily: '"JetBrains Mono", "Courier New", monospace',
        borderTop: "1px solid #222",
      },
    },
    // Left: text block
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "680px",
        },
      },
      // Eyebrow label
      React.createElement(
        "div",
        {
          style: {
            fontSize: 13,
            color: "#555",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          },
        },
        "marcoditoro.com.br"
      ),
      // Name
      React.createElement(
        "div",
        {
          style: {
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#f0f0f0",
            lineHeight: 1.05,
          },
        },
        "Marco Di Toro"
      ),
      // Role
      React.createElement(
        "div",
        {
          style: {
            fontSize: 22,
            color: "#666",
            letterSpacing: "-0.01em",
          },
        },
        "Engenheiro de Software · Full-Stack"
      ),
      // Tech tags row
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: "10px",
            marginTop: "8px",
          },
        },
        ...["C#", "Python", "React", "AWS"].map((tag) =>
          React.createElement(
            "div",
            {
              style: {
                fontSize: 13,
                color: "#888",
                border: "1px solid #2a2a2a",
                borderRadius: "2px",
                padding: "5px 12px",
                letterSpacing: "0.05em",
                backgroundColor: "#111",
              },
            },
            tag
          )
        )
      )
    ),
    // Right: avatar
    React.createElement(
      "div",
      {
        style: {
          width: 200,
          height: 200,
          borderRadius: "2px",
          border: "1px solid #2a2a2a",
          overflow: "hidden",
          display: "flex",
          flexShrink: 0,
        },
      },
      React.createElement("img", {
        src: avatarData as unknown as string,
        width: 200,
        height: 200,
        style: {
          objectFit: "cover",
          filter: "grayscale(20%)",
        },
      })
    )
  );

  return new ImageResponse(root, {
    width: 1200,
    height: 630,
  });
}