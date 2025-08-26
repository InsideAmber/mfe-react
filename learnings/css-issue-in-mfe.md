🔹 What is CSS Scoping in MFE?

CSS scoping means ensuring that the styles of one microfrontend do not accidentally affect or “leak” into another microfrontend (or the host container).

In traditional web apps, CSS is global by default. If two apps have a `.btn` class, their styles can conflict. In MFEs, since multiple apps (built with React, Angular, Vue, etc.) are composed together, this becomes a serious problem.

So CSS scoping is the practice of isolating styles of each microfrontend, so they apply only to that app’s components.

🔹 Why do we need it in MFE?

1. Avoid Style Collisions

- Different teams may use the same class names (.header, .btn, .card) in their MFEs. Without scoping, these styles could override each other.

2. Independent Development

- Teams can freely choose their UI libraries/frameworks (e.g., Tailwind in one MFE, Material UI in another) without worrying about breaking each other’s design.

3. Predictable UI

- The look and feel of each MFE remains consistent and stable, no matter how many apps are composed in the container.

4. Easier Maintenance

- Debugging becomes simpler since you know styles belong only to their respective MFE.

🔹 Ways to Implement CSS Scoping in MFE

1. CSS Modules

- Class names are automatically made unique at build time.

```css
/* button.module.css */
.btn {
  background: blue;
}
```
```tsx
import styles from './button.module.css';
<button className={styles.btn}>Click</button>
```

2. CSS-in-JS (Styled Components, Emotion)

- Generates unique class names at runtime.

```tsx
const Button = styled.button`
  background: blue;
`;
```
3. Shadow DOM (Web Components)

- Native browser encapsulation that completely isolates styles.

4. Namespace Conventions

- Prefixing class names with app name (`marketing-btn`, `dashboard-header`). Not as strong, but works.

5. PostCSS/Scoped CSS

- Using tools to automatically namespace CSS selectors per MFE.

Summary:

CSS scoping in MFEs is about style isolation. Without it, one microfrontend’s CSS could break another’s layout. With it, each MFE behaves like a standalone app with its own style boundary.
