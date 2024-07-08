module "vpc" {
  source     = "./modules/network"
  aws_region = local.aws_region
  prefix     = var.prefix
}

module "ecs" {
  source                    = "./modules/ecs"
  prefix                    = var.prefix
  vpc_id                    = module.vpc.vpc_id
  public_subnets            = module.vpc.public_subnets
  private_subnets           = module.vpc.private_subnets
  domain                    = var.domain
  domain_name               = var.domain_name
  zone_id                   = var.zone_id
  cloudfront_domain_name    = module.cloudfront.domain_name
  cloudfront_hosted_zone_id = module.cloudfront.hosted_zone_id
}

module "s3" {
  source = "./modules/s3"

  prefix      = var.prefix
  oic_iam_arn = module.cloudfront.oic_iam_arn
}

module "cloudfront" {
  source = "./modules/cloudfront"

  prefix = var.prefix
  s3 = {
    bucket_regional_domain_name = module.s3.bucket_regional_domain_name
    bucket_id                   = module.s3.bucket_id
  }
  domain_name = var.cloudfront_domain_name
  zone_id     = var.zone_id
}

module "seacret-manager" {
  source = "./modules/seacret-manager"

  prefix = var.prefix
  my_secrets = {
    db_username = var.db_username
    db_password = var.db_password
    db_endpoint = module.rds.db_endpoint
  }
}

module "rds" {
  source = "./modules/rds"

  prefix             = var.prefix
  private_subnet_ids = module.vpc.private_subnets
  vpc_id             = module.vpc.vpc_id
  db_username        = var.db_username
  db_password        = var.db_password
  cidr_blocks        = [module.vpc.cidr_block]
}

module "bantion-ec2" {
  source = "./modules/EC2"

  prefix              = var.prefix
  public_subnet_id    = module.vpc.public_subnets[0]
  private_subnet_id   = module.vpc.private_subnets[0]
  vpc_id              = module.vpc.vpc_id
  private_cidr_blocks = [module.vpc.private_subnet_a_cidr_block, module.vpc.private_subnet_b_cidr_block]
}

module "codedeploy" {
  source = "./modules/codedeploy"

  prefix = var.prefix
  ecs = {
    cluster_name = module.ecs.cluster_name
    service_name = module.ecs.service_name
  }

  lb_listener = {
    http_80   = module.ecs.http_80_arn
    http_8080 = module.ecs.http_8080_arn
  }

  lb_target_group = {
    blue  = module.ecs.http_blue_target_group_arn
    green = module.ecs.http_green_target_group_arn
  }
}
