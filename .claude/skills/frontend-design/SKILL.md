---
name: frontend-design
description: "Frontend development and design intelligence. Covers: React and Next.js component patterns, TypeScript best practices, Tailwind CSS utilities and responsive design, CSS animations and transitions, component library integration (shadcn/ui, Radix, Headless UI), performance optimization (code splitting, lazy loading, React memo), accessibility (WCAG, ARIA, keyboard nav), state management (Zustand, Jotai, TanStack Query), form handling (React Hook Form, Zod), dark mode implementation, mobile-first responsive layouts, and modern CSS features. Actions: build, implement, optimize, fix, refactor, create, design. Projects: dashboard, landing page, form, modal, navbar, sidebar, table, chart, auth UI."
---
# Frontend Design - Component and UI Development Intelligence

Advanced frontend development patterns for React, Next.js, TypeScript, and Tailwind CSS. Performance-first, accessible, and production-ready.

## When to Apply

Use when building:
- React or Next.js applications
- Component libraries or design systems
- Dashboards, admin panels, or data tables
- Forms with validation
- Authentication UI
- Responsive layouts
- Animated UI elements
- Dark mode implementations

## Core Principles

### Performance First
```tsx
// Always: lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))

// Always: memoize expensive renders
const ExpensiveList = memo(({ items }) => (
  <ul>{items.map(item => <ListItem key={item.id} {...item} />)}</ul>
))

// Always: stable callback references
const handleSubmit = useCallback((data) => {
  // handler
}, [dependency])
```

### Accessibility Non-Negotiables
```tsx
// Focus trap in modals
// Keyboard navigation on all interactive elements
// aria-label on icon-only buttons
// Role and aria-expanded on dropdowns
// Min 44x44px touch targets
// 4.5:1 color contrast minimum
// prefers-reduced-motion respected
```

## Component Patterns

### Compound Component Pattern
```tsx
// Flexible, composable API
<Dropdown>
  <Dropdown.Trigger>Open</Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item>Option 1</Dropdown.Item>
    <Dropdown.Item>Option 2</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

### Controlled vs Uncontrolled
- **Controlled**: parent manages state (`value` + `onChange`) → use for forms
- **Uncontrolled**: component manages state (`defaultValue`) → use for simple UI

### Error Boundary Pattern
```tsx
<ErrorBoundary fallback={<ErrorState />}>
  <Suspense fallback={<Skeleton />}>
    <AsyncComponent />
  </Suspense>
</ErrorBoundary>
```

## Tailwind Patterns

### Responsive Pattern (Mobile-First)
```tsx
// Always mobile-first: sm: md: lg: xl:
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

### Dark Mode Pattern
```tsx
// Use dark: prefix — requires class strategy in tailwind.config
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

### Animation Pattern
```tsx
// Smooth transitions (not instant)
<button className="transition-colors duration-200 hover:bg-blue-700">
// Scale on hover (avoid layout shift with transform)
<div className="transition-transform duration-200 hover:scale-105">
```

## State Management

### When to Use What
| Need | Solution |
|------|---------|
| Server state (API data) | TanStack Query |
| Form state | React Hook Form + Zod |
| Global UI state (modal, theme) | Zustand or Jotai |
| URL state | nuqs or Next.js searchParams |
| Local component state | useState |

## Form Pattern (React Hook Form + Zod)
```tsx
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
})
```

## Next.js Patterns

### Data Fetching Strategy
- **Static (build time)**: `generateStaticParams` + `fetch` with cache
- **Dynamic (request time)**: Server Component with `noStore()` or `force-dynamic`
- **Client-side**: TanStack Query for interactive, user-specific data

### Route Organization
```
app/
  (marketing)/     ← Group without URL segment
    page.tsx
    about/page.tsx
  (app)/           ← Protected app routes
    dashboard/
    settings/
  api/
    users/route.ts
```

## Performance Checklist
- [ ] Images use `next/image` with proper sizes attribute
- [ ] Heavy components are lazy-loaded
- [ ] Lists are virtualized when >100 items (TanStack Virtual)
- [ ] API calls are cached and deduplicated (TanStack Query)
- [ ] Bundle analyzed (next-bundle-analyzer) — no unexpected large imports
- [ ] Fonts are `next/font` (no CLS from font swap)
- [ ] No N+1 data fetching patterns
