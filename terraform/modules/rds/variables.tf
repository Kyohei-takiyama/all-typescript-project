locals {
  db_name = "postgres"
}

# プリフィックスを設定
variable "prefix" {
  type = string
}

variable "private_subnet_ids" {
  type = list(string)
}

variable "vpc_id" {
  type = string
}

# DBのユーザ名を設定
variable "db_username" {
  description = "Username for the RDS postgres instance"
}

# DBのパスワードを設定
variable "db_password" {
  description = "Password for the RDS postgres instance"
}

variable "cidr_blocks" {
  type = list(string)
}
