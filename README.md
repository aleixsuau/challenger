# Challenger
App to create and achieve challenges... Well, to sharp coding skills (DDD, BDD, NX, Standalone components, Tailwind...) to be honest.

## Development server

Run `nx serve challenger` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Architecture

### About monorepos

A monorepo is a single repository containing multiple distinct projects, with well-defined relationships. [Read more](https://monorepo.tools)

### About NX

This project uses NX as a build system and follows its guidelines for monorepo workspaces (with minor deviations). It also follows the Domain Driving Design (DDD) principles to structure and name the code reflecting the business domain (e-learning in this case).

A NX workspace is structured into `apps` and `libs`.

#### Apps

An `app` is a deployable container that links, bundles, and compiles some `libs` together. For example, the `challenger app` aggregates all the `libs` (`subdomains`) needed to provide the functionality of a learning platform (domain).

#### Libs

A `lib` is a container that groups related functionality/code (`subdomain`). For example, the `shell-feature-shell` aggregates all the code needed to provide the course certification functionality.

##### Folder structure

Inside the `libs` folder, the libraries are structured per `scope` (`subdomain`) in the first level, and per `type` in the following levels.

There are 4 `types` of libraries:

* Feature: implements smart UI (with access to data sources) for specific business use cases or pages in an application.
* UI: contains only presentational components (also called "dumb" components).
* Data-access: contains code for interacting with a back-end system. It also includes all the code related to state management.
* Util: contains low-level utilities used by many libraries and applications.

[Read more](https://nx.dev/structure/library-types)

The naming convention for libraries follows its folder path, this is `scope-type-functionality`. So for example, a `lib` placed in `libs/shell/feature/shell` is named `shell-feature-shell`. This favors a meaningful encapsulation of the code (resembling the real world wording), making it more predictable, understandable, and findable.

All the libs used by multiple `scopes` are placed in the `shared` folder, also organized per `type` (e.g. `shared-data-access-rest-api`).

Tips:

* Use the NX Console VSCode plugin to create your `libs`.
* Always create your `libs` as `buildable` to allow the monorepo to [go faster](https://nx.dev/ci/incremental-builds).

##### Tags & Dependency rules

In order to maintain our code as decoupled as possible, NX provides a way of defining and enforcing dependency boundaries based on `tags` and `dependency rules`.

* Tags: are used to define the `app`, `type` and `scope` (`subdomain`) of the `lib`. For example, `{"shell": { "tags": ["app:shared", "scope:shell", "type:feature"] }}`. This is done in the `project.json` files of the libs.
* Dependency rules: are used to limit the `tags` that a `lib` can depend on. For example, `{ "sourceTag": "scope:shell", "onlyDependOnLibsWithTags": ["scope:shell", "scope:shared"] }`. This is done in the global [.eslintrc.json file](./.eslintrc.json).

5 dependency rules:

* `app` and `feature` libs can depend on `feature`, `ui` or `util` libs, but not on `app`. Just keep in mind to move to `shared` those `libs` that are used by multiple `scopes`.
* `ui` libs can only depend on other `ui` or `util` libs.
* `data-access` libs can depend on `data-access` and `util` libs. 
* Every lib can depend on `util` including `util` libs.

Always tag and define dependency rules for the new `libs`.

Tips:

* Use the NX Console VSCode plugin to create and tag your `libs`.
* Use the NX Project Graph to visualize the dependency relationships in your code. For example, in the terminal you would run `nx affected:dep-graph --files=libs/shell/feature/header/src/lib/header/header.component.ts` to see the graph of the `libs` that would be affected by a change on the `header.component.ts` (because they depend on it).
* Use `nx affected:test` to test all the files affected by a change. For example, in the terminal you would run `nx affected:test --files=libs/shell/feature/header/src/lib/header/header.component.ts` to test the files affected by a change in `header.component.ts`.
* Move `libs` around with `nx g @nrwl/workspace:move --project [projectName] [destinationPath]` (e.g. `nx g @nrwl/workspace:move --project shell-feature-menu shared/shell-feature-menu`). It will take care of moving and renaming all the files.
* Check out what the [NX CLI can do for you](https://nx.dev/using-nx/nx-cli).

Main commands:
[generate](https://nx.dev/cli/generate) 
[run](https://nx.dev/cli/run)
[run-many](https://nx.dev/cli/run-many)
[affected](https://nx.dev/cli/affected)

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
