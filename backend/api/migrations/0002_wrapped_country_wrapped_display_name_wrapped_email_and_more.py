# Generated by Django 5.1 on 2024-11-14 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='wrapped',
            name='country',
            field=models.CharField(default='US', max_length=10),
        ),
        migrations.AddField(
            model_name='wrapped',
            name='display_name',
            field=models.CharField(default='Anonymous User', max_length=255),
        ),
        migrations.AddField(
            model_name='wrapped',
            name='email',
            field=models.EmailField(default='no-email@example.com', max_length=254),
        ),
        migrations.AddField(
            model_name='wrapped',
            name='fun_fact',
            field=models.TextField(default='No fun fact provided'),
        ),
        migrations.AddField(
            model_name='wrapped',
            name='profile_image_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='wrapped',
            name='recently_played',
            field=models.JSONField(default=list),
        ),
        migrations.AddField(
            model_name='wrapped',
            name='saved_shows',
            field=models.JSONField(default=list),
        ),
        migrations.AddField(
            model_name='wrapped',
            name='top_albums',
            field=models.JSONField(default=list),
        ),
        migrations.AddField(
            model_name='wrapped',
            name='top_genres',
            field=models.JSONField(default=list),
        ),
        migrations.AlterField(
            model_name='wrapped',
            name='top_artists',
            field=models.JSONField(default=list),
        ),
        migrations.AlterField(
            model_name='wrapped',
            name='top_songs',
            field=models.JSONField(default=list),
        ),
    ]
