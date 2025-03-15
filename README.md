## 

First, Clone this repository the dependencies:
```bash
https://github.com/rogeriocassares/template-web.git
```

Install the dependencies:
```bash
cd template-web
pnpm i
```

Then, run the development server:

```bash
pnpm dev
```

To open in VSCode:
```bash
code .
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


[lang]/(private)/dashboard/layout.tsx
[lang]/(private)/dashboard/page.tsx
[lang]/(private)/dashboard/apps/page.tsx
[lang]/(private)/dashboard/settings/page.tsx

[lang]/(public)/(overview)/layout.tsx
[lang]/(public)/(overview)/page.tsx
[lang]/(public)/login/page.tsx

[lang]/dictionaries/ar-iq.json
[lang]/dictionaries/en-us.json
[lang]/dictionaries/es-es.json
[lang]/dictionaries/pt-br.json

[lang]/langDictionary.ts
[lang]/layout.tsx
[lang]/not-found.tsx

ui/auth/signin-button.tsx
ui/auth/signout-button.tsx
ui/auth/username-button.tsx

ui/dashboard/nav-links.tsx
ui/dashboard/sidenav.tsx

ui/login/
ui/overview

ui/header.tsx


auth.ts
locale.ts
middleware.ts


api/auth/[...nextauth]/route.ts ->  Refer to the auth.ts

lib/actions -> CRUD and Validate forms with zod
lib/data -> Fetch data from SQL/API
lib/definitions -> define the type of data to fetch
lib/placeholder-data -> synthetic data
lib/utils -> general format/conversion functions







