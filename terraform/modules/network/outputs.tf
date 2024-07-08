output "vpc_id" {
  value = aws_vpc.this.id
}

output "public_subnets" {
  value = aws_subnet.public[*].id
}

output "private_subnets" {
  value = aws_subnet.private[*].id
}

output "cidr_block" {
  value = aws_vpc.this.cidr_block
}

output "public_subnet_a_id" {
  value = element(aws_subnet.public[*].id, 0)
}

output "public_subnet_b_id" {
  value = element(aws_subnet.public[*].id, 1)
}

output "private_subnet_a_id" {
  value = element(aws_subnet.private[*].id, 0)
}

output "private_subnet_b_id" {
  value = element(aws_subnet.private[*].id, 1)
}

output "public_subnet_a_cidr_block" {
  value = element(local.public_subnets, 0)
}

output "public_subnet_b_cidr_block" {
  value = element(local.public_subnets, 1)
}

output "private_subnet_a_cidr_block" {
  value = element(local.private_subnets, 0)
}

output "private_subnet_b_cidr_block" {
  value = element(local.private_subnets, 1)
}
