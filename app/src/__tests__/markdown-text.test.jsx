import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MarkdownText from "../components/MarkdownText";

// =============================================================================
// Security / XSS Tests
// =============================================================================
describe("MarkdownText – XSS security", () => {
  it("escapes <script> tags so they render as text, not executable HTML", () => {
    const { container } = render(
      <MarkdownText text='<script>alert(1)</script>' />
    );
    expect(container.innerHTML).not.toContain("<script>");
    expect(container.innerHTML).toContain("&lt;script&gt;");
    expect(container.innerHTML).toContain("&lt;/script&gt;");
  });

  it("escapes <img onerror> XSS vector", () => {
    const { container } = render(
      <MarkdownText text='<img onerror=alert(1)>' />
    );
    expect(container.innerHTML).not.toContain("<img");
    expect(container.innerHTML).toContain("&lt;img onerror=alert(1)&gt;");
  });

  it("double-escapes HTML numeric entities like &#60;script&#62;", () => {
    // Use a JS variable to avoid JSX decoding the HTML entities
    const input = "&#60;script&#62;alert(1)&#60;/script&#62;";
    const { container } = render(<MarkdownText text={input} />);
    // The & in &#60; must be escaped to &amp;, preventing entity decode.
    // The browser serializes &amp; back to &amp; in innerHTML, so we see
    // the literal escaped sequence in the output.
    expect(container.innerHTML).toContain("&amp;#60;script&amp;#62;");
    expect(container.innerHTML).not.toContain("<script>");
  });

  it("escapes event handler attributes like onclick", () => {
    const { container } = render(
      <MarkdownText text='<div onclick="alert(1)">click me</div>' />
    );
    expect(container.innerHTML).not.toContain("<div onclick");
    expect(container.innerHTML).toContain("&lt;div onclick=");
    expect(container.innerHTML).toContain("&lt;/div&gt;");
  });

  it("escapes script tags even when nested inside bold markdown markers", () => {
    const { container } = render(
      <MarkdownText text="**<script>alert(1)</script>**" />
    );
    // The bold tags should be applied but the script content must be escaped
    expect(container.innerHTML).toContain("<strong>");
    expect(container.innerHTML).toContain("</strong>");
    expect(container.innerHTML).not.toContain("<script>");
    expect(container.innerHTML).toContain("&lt;script&gt;");
  });

  it("escapes script tags nested inside italic markdown markers", () => {
    const { container } = render(
      <MarkdownText text="*<script>alert(1)</script>*" />
    );
    expect(container.innerHTML).toContain("<em>");
    expect(container.innerHTML).toContain("</em>");
    expect(container.innerHTML).not.toContain("<script>");
    expect(container.innerHTML).toContain("&lt;script&gt;");
  });

  it("escapes javascript: protocol URIs", () => {
    const { container } = render(
      <MarkdownText text='<a href="javascript:alert(1)">link</a>' />
    );
    expect(container.innerHTML).not.toContain("<a ");
    expect(container.innerHTML).toContain("&lt;a href=");
  });

  it("escapes <iframe> injection attempts", () => {
    const { container } = render(
      <MarkdownText text='<iframe src="https://evil.com"></iframe>' />
    );
    expect(container.innerHTML).not.toContain("<iframe");
    expect(container.innerHTML).toContain("&lt;iframe");
  });
});

// =============================================================================
// Formatting Tests
// =============================================================================
describe("MarkdownText – formatting", () => {
  it("converts **bold** to <strong> tags", () => {
    const { container } = render(<MarkdownText text="**bold text**" />);
    expect(container.innerHTML).toContain("<strong>bold text</strong>");
  });

  it("converts *italic* to <em> tags", () => {
    const { container } = render(<MarkdownText text="*italic text*" />);
    expect(container.innerHTML).toContain("<em>italic text</em>");
  });

  it("handles **bold** and *italic* in the same line", () => {
    const { container } = render(
      <MarkdownText text="**bold** and *italic*" />
    );
    expect(container.innerHTML).toContain("<strong>bold</strong>");
    expect(container.innerHTML).toContain("<em>italic</em>");
  });

  it("returns null for empty string", () => {
    const { container } = render(<MarkdownText text="" />);
    expect(container.innerHTML).toBe("");
  });

  it("returns null for null input", () => {
    const { container } = render(<MarkdownText text={null} />);
    expect(container.innerHTML).toBe("");
  });

  it("returns null for undefined input", () => {
    const { container } = render(<MarkdownText text={undefined} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders a single line as one paragraph", () => {
    render(<MarkdownText text="Hello world" />);
    const paragraphs = screen.getAllByText("Hello world");
    expect(paragraphs).toHaveLength(1);
    expect(paragraphs[0].tagName).toBe("P");
  });

  it("renders multiple lines as multiple paragraphs", () => {
    render(<MarkdownText text={"Line one\nLine two\nLine three"} />);
    expect(screen.getByText("Line one").tagName).toBe("P");
    expect(screen.getByText("Line two").tagName).toBe("P");
    expect(screen.getByText("Line three").tagName).toBe("P");
  });

  it("renders empty lines as spacer divs with h-2 class", () => {
    const { container } = render(
      <MarkdownText text={"Line one\n\nLine two"} />
    );
    const spacers = container.querySelectorAll("div.h-2");
    expect(spacers.length).toBeGreaterThanOrEqual(1);
  });

  it("applies pl-4 class to numbered list items (e.g., '1. ')", () => {
    const { container } = render(<MarkdownText text="1. First item" />);
    const p = container.querySelector("p");
    expect(p.className).toContain("pl-4");
  });

  it("applies pl-4 class to dash-prefixed list items ('- ')", () => {
    const { container } = render(<MarkdownText text="- Dash item" />);
    const p = container.querySelector("p");
    expect(p.className).toContain("pl-4");
  });

  it("applies pl-4 class to bullet-prefixed list items ('• ')", () => {
    const { container } = render(<MarkdownText text="• Bullet item" />);
    const p = container.querySelector("p");
    expect(p.className).toContain("pl-4");
  });

  it("does NOT apply pl-4 class to regular (non-list) lines", () => {
    const { container } = render(
      <MarkdownText text="Just a normal sentence." />
    );
    const p = container.querySelector("p");
    expect(p.className).not.toContain("pl-4");
  });

  it("wraps all content in a div with space-y-2 class", () => {
    const { container } = render(<MarkdownText text="Hello" />);
    const wrapper = container.firstChild;
    expect(wrapper.tagName).toBe("DIV");
    expect(wrapper.className).toContain("space-y-2");
  });
});

// =============================================================================
// HTML Entity Escaping Tests
// =============================================================================
describe("MarkdownText – HTML entity escaping", () => {
  it("escapes & to &amp;", () => {
    const { container } = render(<MarkdownText text="A & B" />);
    expect(container.innerHTML).toContain("A &amp; B");
  });

  it("escapes < to &lt;", () => {
    const { container } = render(<MarkdownText text="1 < 2" />);
    expect(container.innerHTML).toContain("1 &lt; 2");
  });

  it("escapes > to &gt;", () => {
    const { container } = render(<MarkdownText text="2 > 1" />);
    expect(container.innerHTML).toContain("2 &gt; 1");
  });

  it('escapes double quotes to &quot;', () => {
    const { container } = render(<MarkdownText text='She said "hello"' />);
    // The component escapes " to &quot; in the HTML string passed to
    // dangerouslySetInnerHTML. The browser normalizes &quot; back to a
    // literal " in text content when serializing innerHTML, so we verify
    // the text is safely rendered (not interpreted as attribute boundaries).
    const p = container.querySelector("p");
    expect(p.textContent).toContain('She said "hello"');
    // Also verify no raw unescaped HTML was injected
    expect(container.innerHTML).not.toContain("<script>");
  });

  it("escapes single quotes to &#039;", () => {
    const { container } = render(<MarkdownText text="It's fine" />);
    // The component escapes ' to &#039;. The browser normalizes this back
    // to a literal ' in text nodes when serializing innerHTML.
    const p = container.querySelector("p");
    expect(p.textContent).toContain("It's fine");
  });
});

// =============================================================================
// Edge Cases
// =============================================================================
describe("MarkdownText – edge cases", () => {
  it("handles input with only whitespace lines", () => {
    const { container } = render(<MarkdownText text={"   \n   \n   "} />);
    // Whitespace-only lines are treated as empty (trimmed), rendered as spacers
    const spacers = container.querySelectorAll("div.h-2");
    expect(spacers.length).toBe(3);
    // No <p> paragraphs should exist
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBe(0);
  });

  it("handles a very long single line without breaking", () => {
    const longText = "word ".repeat(1000).trim();
    const { container } = render(<MarkdownText text={longText} />);
    const p = container.querySelector("p");
    expect(p).not.toBeNull();
    expect(p.textContent).toBe(longText);
  });

  it("handles multiple bold segments in one line", () => {
    const { container } = render(
      <MarkdownText text="**first** then **second**" />
    );
    expect(container.innerHTML).toContain("<strong>first</strong>");
    expect(container.innerHTML).toContain("<strong>second</strong>");
  });

  it("handles multiple italic segments in one line", () => {
    const { container } = render(
      <MarkdownText text="*first* then *second*" />
    );
    expect(container.innerHTML).toContain("<em>first</em>");
    expect(container.innerHTML).toContain("<em>second</em>");
  });

  it("handles multi-digit numbered list items like '10. '", () => {
    const { container } = render(<MarkdownText text="10. Tenth item" />);
    const p = container.querySelector("p");
    expect(p.className).toContain("pl-4");
  });

  it("does not treat a number without a trailing space as a list item", () => {
    const { container } = render(<MarkdownText text="1.No space after dot" />);
    const p = container.querySelector("p");
    expect(p.className).not.toContain("pl-4");
  });

  it("handles a mix of list items and normal lines", () => {
    const { container } = render(
      <MarkdownText text={"Introduction\n1. First\n2. Second\nConclusion"} />
    );
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBe(4);
    expect(paragraphs[0].className).not.toContain("pl-4");
    expect(paragraphs[1].className).toContain("pl-4");
    expect(paragraphs[2].className).toContain("pl-4");
    expect(paragraphs[3].className).not.toContain("pl-4");
  });

  it("renders text containing all five escaped entities together", () => {
    const { container } = render(
      <MarkdownText text={`<"Tom & Jerry's"> show`} />
    );
    // < and > are escaped and remain visible in innerHTML
    expect(container.innerHTML).toContain("&lt;");
    expect(container.innerHTML).toContain("&gt;");
    // & is escaped and remains visible in innerHTML
    expect(container.innerHTML).toContain("&amp;");
    // " and ' are escaped by the component (&quot; and &#039;) but the
    // browser normalizes them back to literal characters in text nodes.
    // We verify the text content is correct and no raw HTML was injected.
    const p = container.querySelector("p");
    expect(p.textContent).toBe(`<"Tom & Jerry's"> show`);
  });
});
