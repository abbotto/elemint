# Toolchain

[<< back to docs](../../README.md#contributing)

## Applications

All of the required apps can be installed by running:

```
> ./dev/util/toolchain.sh
```

### [pipx](https://pipxproject.github.io/pipx/)

[pipx](https://pipxproject.github.io/pipx/) creates an isolated environment for each application and its associated packages.

```
> pip install pipx
```

### [commitizen](https://commitizen-tools.github.io/commitizen/)

[commitizen](https://commitizen-tools.github.io/commitizen/) includes a set of linting rules and tooling for standardized commit workflows. 

```
> pipx install commitizen
```

### [pre-commit](https://pre-commit.com/)

[pre-commit](https://pre-commit.com/) manages the installation and execution of any hook written in any language before every commit.

```
> pipx install pre-commit
> pre-commit install --hook-type commit-msg
> pre-commit install
```

## Utilities

### [Formatting](#formatting)

Format files with [prettier](https://prettier.io/) and [eslint](https://eslint.org/).

```
> npm run format
```

### [Build the Library](#build-the-library)

```
> npm run build
```

### [Testing](#testing)

#### Running Spec Files

Run [karma](https://karma-runner.github.io/latest/index.html) to execute the tests.

```
> npm run test
```

#### Linting Project Files

Run [eslint](https://eslint.org/) and [shellcheck](https://www.shellcheck.net/) against JavaScript and shell scripts.

```
> npm run lint:js
> npm run lint:sh
```

### Documentation

#### Generate Documentation

```
> npm run doc
```

[<< back to docs](../../README.md#contributing)
