resource "aws_secretsmanager_secret" "this" {
  name        = "${var.prefix}-seacret"
  description = "This is a secret manager for ${var.prefix}"

  tags = {
    Name = "${var.prefix}-seacret"
  }
}


resource "aws_secretsmanager_secret_version" "this" {
  secret_id     = aws_secretsmanager_secret.this.id
  secret_string = jsonencode(var.my_secrets)
}
