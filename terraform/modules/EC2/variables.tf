locals {
  ami_image_for_bastion = "amzn-ami-hvm-*-x86_64-gp2"
  key_name              = "rds-bastion-key"
}

variable "prefix" {
  type = string
}

variable "public_subnet_id" {
  type = string
}

variable "private_subnet_id" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "private_cidr_blocks" {
  type = list(string)
}
