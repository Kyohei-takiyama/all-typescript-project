variable "prefix" {
  type = string
}

variable "my_secrets" {
  default = {
    key1 = "secret_value1"
    key2 = "secret_value2"
  }

  type = map(string)
}
