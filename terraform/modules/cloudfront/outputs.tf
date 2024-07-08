output "oic_iam_arn" {
  value = aws_cloudfront_origin_access_identity.distribution.iam_arn
}

output "domain_name" {
  value = aws_cloudfront_distribution.distribution.domain_name
}

output "hosted_zone_id" {
  value = aws_cloudfront_distribution.distribution.hosted_zone_id
}
