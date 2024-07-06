locals {
  # 安いからオレゴンにする
  aws_region = "us-west-2"
  env        = "dev"
  service    = "all-ts-project"
}

variable "account_id" {
  type = string
}

variable "aws_access_key" {
  type = string
}

variable "aws_secret_key" {
  type = string
}

variable "main_domain" {
  type = string
}

variable "sub_domain" {
  type = string
}

variable "github_owner" {
  type = string
}

variable "github_repo" {
  type = string
}

variable "zone_id" {
  type = string
}

variable "prefix" {
  type    = string
  default = "ts-pj"
}

variable "github-oidc-endpoint" {
  description = "The GitHub OIDC endpoint"
  type        = string
  default     = "https://token.actions.githubusercontent.com"
}

