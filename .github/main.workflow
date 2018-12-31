workflow "build, test and publish" {
  on = "push"
  resolves = ["nom install"]
}

action "nom install" {
  uses = "actions/npm@e7aaefe"
  runs = "install"
}
