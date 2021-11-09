use clap::Parser;
use std::process::Command;
// use subprocess::{CaptureData, Exec, Redirection};

const VERSION: &'static str = env!("CARGO_PKG_VERSION");

#[derive(Parser)]
#[clap(version = VERSION)]
struct Typac {
    #[clap(subcommand)]
    command: SubCommand,
}

#[derive(Parser)]
enum SubCommand {
    #[clap(version = VERSION)]
    Add(Add),

    #[clap(version = VERSION)]
    Remove(Remove),
}

#[derive(Parser)]
struct Add {
    package: String,

    #[clap(short, long)]
    dev: bool,

    #[clap(short, long)]
    save: bool,
}

#[derive(Parser)]
struct Remove {
    package: String,

    #[clap(short, long)]
    dev: bool,

    #[clap(short, long)]
    save: bool,
}

fn main() {
    let typac: Typac = Typac::parse();

    match typac.command {
        SubCommand::Add(t) => {
            if t.dev {
                println!("Add dev {}", t.package);
            }
            println!("Add {}", t.package);
        }
        SubCommand::Remove(t) => {
            println!("Remove {}", t.package);
        }
    }

    let output = if cfg!(target_os = "windows") {
        Command::new("cmd")
            .args(["/C", "echo hello"])
            .spawn()
            .expect("failed to execute process")
    } else {
        Command::new("sh")
            .arg("-c")
            .arg("echo hello")
            .spawn()
            .expect("failed to execute process")
    };
    let hello = output.stdout;
}
