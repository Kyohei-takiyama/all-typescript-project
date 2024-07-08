####################################################
# RDS 踏み台サーバー
# DBがVPC内からしかアクセスできないため、VPC内に踏み台サーバーを作成する
####################################################

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-2.*-x86_64-gp2"]
  }
}

resource "aws_instance" "bastion" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t2.micro"
  user_data     = file("${path.module}/user_data.sh")
  key_name      = local.key_name
  subnet_id     = var.private_subnet_id

  vpc_security_group_ids = [
    aws_security_group.bastion.id
  ]

  iam_instance_profile = aws_iam_instance_profile.bastion.name

  depends_on = [aws_iam_instance_profile.bastion]

  tags = {
    Name = "${var.prefix}-bastion"
  }
}

####################################################
# 踏み台サーバーのセキュリティグループ
####################################################
resource "aws_security_group" "bastion" {
  description = "Control bastion inbound and outbound access"
  name        = "${var.prefix}-bastion"
  vpc_id      = var.vpc_id

  # 踏み台サーバへのSSH接続を許可
  ingress {
    protocol    = "tcp"
    from_port   = 22
    to_port     = 22
    cidr_blocks = ["0.0.0.0/0"]
  }

  # 踏み台サーバから最新のパッケージのダウンロードができるようにするため
  egress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  # 踏み台サーバから最新のパッケージのダウンロードができるようにするため
  egress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  # DBへアクセスできるようにするため
  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = var.private_cidr_blocks
  }

  tags = {
    Name = "${var.prefix}-bastion-security-group"
  }
}

####################################################
# IAMロール
####################################################
# 踏み台サーバ用のIAMロールを作成
resource "aws_iam_role" "bastion" {
  name = "${var.prefix}-bastion-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name = "${var.prefix}-bastion-role"
  }
}

# IAMロールにポリシーを割り当てる
resource "aws_iam_role_policy_attachment" "bastion_attach_policy" {
  role = aws_iam_role.bastion.name
  # EC2インスタンスへセッションマネージャーを使って接続するポリシー(AmazonSSMManagedInstanceCore)をアタッチする
  # https://docs.aws.amazon.com/ja_jp/aws-managed-policy/latest/reference/AmazonSSMManagedInstanceCore.html
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

# IAMロールにインスタンスプロファイルを作成
resource "aws_iam_instance_profile" "bastion" {
  name = "${var.prefix}-bastion-profile"
  role = aws_iam_role.bastion.name
}
