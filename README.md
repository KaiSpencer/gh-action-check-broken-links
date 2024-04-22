# Link Checker

Maintained fork of [hashicorp/gh-action-check-broken-links](https://github.com/hashicorp/gh-action-check-broken-links), updated with modern tooling.

![CI Status](https://github.com/KaiSpencer/gh-action-check-broken-links/workflows/CI/badge.svg)
![GitHub Release](https://img.shields.io/github/v/release/KaiSpencer/gh-action-check-broken-links?label=Latest%20Release)

A GitHub Action that reports all broken links found within a set of provided `.mdx` files

- :warning: Currently only supports `.mdx` files

## Features

Parses `.mdx` files, locating all links. Reports back any failed requests including those that contain a fragment identifier (i.e. https://example.com/page#identifier) but whose resulting markup does not.

## Example Usage

```yaml
- name: MDX Broken Link Checker
  uses: KaiSpencer/gh-action-check-broken-links@v0
  with:
    # Required: The base URL to check links against
    # For example: /pages/foo.mdx will be checked against https://mysite.com/foo
    baseUrl: 'https://mysite.com'

    # Optional: Provide a list of files to check
    files: 'pages/foo.mdx pages/bar.mdx'
    
    # Optional: Provide a directory to check for files
    # Will recurse all sub directories
    directory: 'pages'

    # Optional: Provide a list of URLs to whitelist
    # These URLs will not be checked
    whitelist: |
      https://google.com/whitelist
      https://yahoo.com/whitelist
```
