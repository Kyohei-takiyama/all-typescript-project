terraform {
  required_version = ">= 1.7.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
  }
}

provider "aws" {
  region = local.aws_region

  default_tags {
    tags = {
      "Terraform"   = "true"
      "Environment" = "dev"
      service       = local.service
      gh_reponame   = var.github_repo
    }
  }
}

# Provider for ACM CloudFront
provider "aws" {
  alias  = "acm_provider"
  region = "us-east-1"
}
