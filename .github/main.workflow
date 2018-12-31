workflow "build, test and publish" {
  on = "push"
  resolves = ["GitHub Action for npm"]
}

action "GitHub Action for npm" {
  uses = "yarn"
  runs = "build"
}
