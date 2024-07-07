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
  acm_certificate_arn = aws_acm_certificate.us_east_1.arn
  domain_name         = var.cloudfront_domain_name
}

##################
# ACM for CloudFront 北部リージョンの証明書を取得する(ACM自体は手動で作成してImportする)
# https://qiita.com/jibirian999/items/6abf056d741281141f29
##################
resource "aws_acm_certificate" "us_east_1" {
  provider          = aws.acm_provider
  domain_name       = var.cloudfront_domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = false
  }
}
